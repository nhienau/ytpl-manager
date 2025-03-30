import { createContext, useContext, useEffect, useRef, useState } from "react";
import WebWorker from "../utils/WebWorker";
import worker from "../services/apiPlaylist.worker";
import FullPage from "../ui/FullPage";
import Spinner from "../ui/Spinner";

type WorkerContextType = {
  worker: Worker | null;
};

const WorkerContext = createContext<WorkerContextType>({ worker: null });

function WorkerProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(function () {
    workerRef.current = new WebWorker(worker);
    setIsReady(true);

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  if (!isReady) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return (
    <WorkerContext.Provider value={{ worker: workerRef.current }}>
      {children}
    </WorkerContext.Provider>
  );
}

function useWorker() {
  const context = useContext(WorkerContext);
  if (context === null || context === undefined) {
    throw new Error("WorkerContext was used outside of WorkerProvider");
  }
  return context.worker;
}

export { WorkerProvider, useWorker };
