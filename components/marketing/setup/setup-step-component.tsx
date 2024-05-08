"use client";

import { useState } from "react";
import DomainSetupComponent from "./domain-setup-component";
import LoginComponent from "./login-component";
import NotionSetupComponent from "./notion-setup-component";
import SetupCompleteComponent from "./setup-complete-component";
import TemplateSelectComponent from "./template-select-component";
import { User } from "@supabase/auth-helpers-nextjs";

export interface SetupData {
  siteDomain: string;
  notionToken: string;
  notionId: string;
  templateId: number;
}

export default function SetupStepComponent({ user }: { user: User | null }) {
  const defaultStepValue = user ? 2 : 1;
  const [step, setStep] = useState(defaultStepValue);
  const [setupData, setSetupData] = useState<SetupData>({
    siteDomain: "",
    notionToken: "",
    notionId: "",
    templateId: 0,
  });

  // const [step, setStep] = useState(5);
  // const [setupData, setSetupData] = useState<SetupData>({
  //   siteDomain: "shincode_blog",
  //   notionToken: "secret_uc7RDVzbGbIxkyStI2swlJejlAUsnQrPdEBz5hnYdfd",
  //   notionId: "127ef6b3de6b408880c046925f5917c6",
  //   templateId: 1,
  // });

  const updateSetupData = (newData: Partial<SetupData>) => {
    setSetupData((prevData) => ({ ...prevData, ...newData }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <LoginComponent onSuccess={nextStep} />;
    case 2:
      return (
        <DomainSetupComponent
          onSuccess={nextStep}
          updateData={updateSetupData}
        />
      );
    case 3:
      return (
        <TemplateSelectComponent
          onSuccess={nextStep}
          onBack={prevStep}
          updateData={updateSetupData}
        />
      );
    case 4:
      return (
        <NotionSetupComponent
          onSuccess={nextStep}
          onBack={prevStep}
          updateData={updateSetupData}
        />
      );
    case 5:
      return <SetupCompleteComponent onBack={prevStep} setupData={setupData} />;
    default:
      return <div>未確認のステップです。ホーム画面に戻ってください。</div>;
  }
}
