import React, { useEffect } from "react";
import BootAnimation from "@/components/BootAnimation";

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "Kishor Arjunan";
  }, []);

  return <BootAnimation />;
};

export default Index;
