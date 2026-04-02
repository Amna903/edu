import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useAuthUser } from "@/hooks/use-auth";
import { useCheckout } from "@/hooks/use-orders";
import { useInitPayment } from "@/hooks/use-payments";

export default function Cart() {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { toast } = useToast();
  const { data: user } = useAuthUser();
  const checkout = useCheckout();
  const initPayment = useInitPayment();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      if (total > 0) {
        const payment = await initPayment.mutateAsync({
          items,
          totalAmount: total,
        });
        window.location.assign(payment.checkoutUrl);
        return;
      }

      await checkout.mutateAsync({
        items,
        totalAmount: total
      });

      toast({
        title: "Order Successful",
        description: "You have been enrolled in all selected programs!",
      });
      
      clearCart();
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "There was an error processing your request.",
        variant: "destructive"
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
                          ${(item.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-red-500"
                        onClick={() => removeFromCart(item.programId)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="border-[#2366c9]  border-2 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-black">
                    <span>Subtotal</span>
                    <span>${(total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-semibold text-xl">
                    <span>Total</span>
                    <span className="text-emerald-600">${(total / 100).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {!user && (
                    <div className="w-full space-y-3">
                      <Link href="/login">
                        <Button className="w-full bg-[#2366c9] hover:bg-blue-700 h-12 text-lg">
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
