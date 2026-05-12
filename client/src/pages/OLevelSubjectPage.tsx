import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { SubjectPage } from "@/components/SubjectPage";
import type { SubjectData } from "@/data/subjects/types";

const subjectLoaders: Record<string, () => Promise<{ default: SubjectData }>> = {
  mathematics: () => import("@/data/subjects/mathematics"),
  physics: () => import("@/data/subjects/physics"),
  chemistry: () => import("@/data/subjects/chemistry"),
  biology: () => import("@/data/subjects/biology"),
  "english-language": () => import("@/data/subjects/english-language"),
};

export default function OLevelSubjectPage() {
  const [, params] = useRoute("/olevel/:subjectSlug");
  const [, navigate] = useLocation();
  const [data, setData] = useState<SubjectData | null>(null);

  useEffect(() => {
    const slug = params?.subjectSlug;
    if (!slug || !(slug in subjectLoaders)) {
      navigate("/olevel-subjects", { replace: true });
      return;
    }

    let isActive = true;
    subjectLoaders[slug]()
      .then((module) => {
        if (isActive) {
          setData(module.default);
        }
      })
      .catch(() => {
        navigate("/olevel-subjects", { replace: true });
      });

    return () => {
      isActive = false;
    };
  }, [navigate, params?.subjectSlug]);

  if (!data) {
    return null;
  }

  return <SubjectPage data={data} />;
}