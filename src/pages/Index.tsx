
import React, { useEffect } from "react";
import BootAnimation from "@/components/BootAnimation";

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Portfolio Terminal";
  }, []);

  return <BootAnimation />;
};

export default Index;
