
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag, CheckCircle2, Tag, X, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useAuthUser } from "@/hooks/use-auth";
import { useCheckout } from "@/hooks/use-orders";
import { useInitPayment } from "@/hooks/use-payments";
import { useScholarshipValidate } from "@/hooks/use-scholarship";
import { formatMoneyFromMinorUnits } from "@/lib/currency";
import { saveScholarshipToStorage, loadScholarshipFromStorage } from "@/lib/scholarship-storage";

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    discount,
    total,
    scholarship,
    applyScholarship,
    clearScholarship,
  } = useCart();
  const { toast } = useToast();
  const { data: user } = useAuthUser();
  const checkout = useCheckout();
  const initPayment = useInitPayment();
  const validateScholarship = useScholarshipValidate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  useEffect(() => {
    const stored = loadScholarshipFromStorage();
    if (stored && !scholarship) {
      applyScholarship({
        code: stored.code,
        country: stored.country,
        concessionPercent: stored.concessionPercent,
        region: stored.region,
      });
      setCodeInput(stored.code);
    } else if (scholarship) {
      setCodeInput(scholarship.code);
    }
  }, [scholarship, applyScholarship]);

  const handleApplyCode = async () => {
    const trimmed = codeInput.trim().toUpperCase();
    if (!trimmed) return;

    if (!user) {
      toast({
        title: "Login required",
        description: "Scholarship codes are verified against your logged-in account and country.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await validateScholarship.mutateAsync(trimmed);
      const applied = {
        code: result.code,
        country: result.country,
        concessionPercent: result.concessionPercent,
        region: result.region,
      };
      applyScholarship(applied);
      saveScholarshipToStorage({
        ...applied,
        email: user?.email ?? "",
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      });
      toast({
        title: "Concession applied",
        description: `${result.concessionPercent}% off for ${result.country}.`,
      });
    } catch (error) {
      toast({
        title: "Invalid code",
        description: error instanceof Error ? error.message : "Could not apply scholarship code",
        variant: "destructive",
      });
    }
  };

  const handleRemoveScholarship = () => {
    clearScholarship();
    setCodeInput("");
    toast({ title: "Scholarship removed" });
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);
    try {
      const payload = {
        items,
        totalAmount: total,
        scholarshipCode: scholarship?.code,
      };

      if (total > 0) {
        const payment = await initPayment.mutateAsync(payload);
        // Clear cart immediately — user is being redirected to payment gateway.
        // If they cancel and come back, the cart is empty (acceptable trade-off vs.
        // stale cart persisting forever after successful payment).
        clearCart();
        clearScholarship();
        window.location.assign(payment.checkoutUrl);
        return;
      }

      await checkout.mutateAsync(payload);

      toast({
        title: "Order Successful",
        description: "You have been enrolled in all selected programs!",
      });

      clearCart();
      clearScholarship();
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "There was an error processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-semibold mb-4">Enrollment Confirmed!</h1>
            <p className="text-black mb-8">
              Welcome to EduMeUp! Your order has been processed and you now have full access to your selected programs.
            </p>
            <Link href="/programs">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Explore More Programs
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-semibold mb-8">Your Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-black mb-6">Your cart is empty</p>
                    <Link href="/programs">
                      <Button variant="outline">Browse Programs</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                items.map((item) => (
                  <Card key={item.programId}>
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-emerald-600 font-semibold">
                          {formatMoneyFromMinorUnits(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 items-center overflow-hidden rounded-md border border-slate-200 bg-white">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none text-slate-500"
                            onClick={() => updateQuantity(item.programId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center text-sm font-semibold text-slate-900">
                            {item.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-none text-slate-500"
                            onClick={() => updateQuantity(item.programId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.programId)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="border-brand-primary border-2 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                      <Tag className="h-4 w-4 text-brand-primary" />
                      Scholarship / concession code
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. EDU30-ABC123"
                        className="font-mono uppercase"
                        disabled={!!scholarship}
                      />
                      {scholarship ? (
                        <Button type="button" variant="outline" size="icon" onClick={handleRemoveScholarship}>
                          <X className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleApplyCode}
                          disabled={validateScholarship.isPending || !codeInput.trim()}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {scholarship && (
                      <p className="text-xs text-emerald-700 font-medium">
                        {scholarship.concessionPercent}% concession applied ({scholarship.country})
                      </p>
                    )}
                    {!scholarship && (
                      <p className="text-xs text-slate-500">
                        No code yet?{" "}
                        <Link href="/pricing#scholarship" className="text-brand-primary underline font-medium">
                          Apply on the pricing page
                        </Link>
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between text-black">
                    <span>Items</span>
                    <span>{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Subtotal</span>
                    <span>{formatMoneyFromMinorUnits(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Scholarship ({scholarship?.concessionPercent}%)</span>
                      <span>-{formatMoneyFromMinorUnits(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-black">
                    <span>Tax</span>
                    <span>{formatMoneyFromMinorUnits(0)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-semibold text-xl">
                    <span>Total</span>
                    <span className="text-emerald-600">{formatMoneyFromMinorUnits(total)}</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                    <p className="text-[13px] text-blue-800 font-medium">
                      Do you qualify for our scholarship?{" "}
                      <Link href="/pricing#scholarship" className="underline font-bold hover:text-blue-900">
                        Check here
                      </Link>{" "}
                      before paying.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  {!user && (
                    <div className="w-full space-y-3">
                      <Link href="/login">
                        <Button className="w-full bg-brand-primary hover:bg-brand-primary-dark h-12 text-lg">
                          Login To Checkout
                        </Button>
                      </Link>
                    </div>
                  )}
                  {user && (
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg"
                      disabled={items.length === 0 || isCheckingOut || checkout.isPending}
                      onClick={handleCheckout}
                    >
                      {isCheckingOut || checkout.isPending ? "Processing..." : "Complete Checkout"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
