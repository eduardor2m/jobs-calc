import { createContext, ReactNode, useContext, useState } from 'react';

interface JobProviderProps {
  children: ReactNode;
}

type Job = {
  id: string;
  number: number;
  title: string;
  price: string;
  hours: number;
  hoursDay: number;
  deadline: number;
  status: boolean;
};

interface JobContextData {
  job: Job[];
  addJob: (job: Job) => Promise<void>;
  removeJob: (jobId: string) => void;
  editJob: (jobId: string, newJob: Job) => void;
  changeStatusJob: (jobId: string) => void;
}

const JobContext = createContext<JobContextData>({} as JobContextData);

export function JobProvider({ children }: JobProviderProps): JSX.Element {
  const storageKey = '@JobsCalc:Jobs';

  const [job, setJob] = useState<Job[]>(() => {
    if (typeof window !== 'undefined') {
      const storagedJob = localStorage.getItem(storageKey);

      if (storagedJob) {
        return JSON.parse(storagedJob);
      }
    }

    return [];
  });

  const addJob = async (newJob: Job) => {
    const newJobFormatted = {
      id: newJob.id,
      number: newJob.number,
      title: newJob.title,
      price: newJob.price.toLocaleString(),
      hours: newJob.hours,
      hoursDay: newJob.hoursDay,
      deadline: newJob.deadline,
      status: newJob.status,
    };
    const newJobs = [...job, newJobFormatted];

    try {
      setJob(newJobs);
      localStorage.setItem(storageKey, JSON.stringify(newJobs));
    } catch {
      throw new Error('Erro na adição do produto');
    }
  };

  const removeJob = (jobId: string) => {
    try {
      const newJob = job.filter((job) => job.id !== jobId);
      setJob(newJob);
      localStorage.setItem(storageKey, JSON.stringify(newJob));
    } catch {
      throw new Error('Erro na remoção do produto');
    }
  };

  const editJob = (jobId: string, newJob: Job) => {
    try {
      const newJobs = job.map((job) => (job.id === jobId ? newJob : job));
      setJob(newJobs);
      localStorage.setItem(storageKey, JSON.stringify(newJobs));
    } catch {
      throw new Error('Erro na edição do produto');
    }
  };

  const changeStatusJob = (jobId: string) => {
    try {
      const newJobs = job.map((job) =>
        job.id === jobId ? { ...job, status: !job.status } : job
      );
      setJob(newJobs);
      localStorage.setItem(storageKey, JSON.stringify(newJobs));
    } catch {
      throw new Error('Erro na edição do produto');
    }
  };

  return (
    <JobContext.Provider
      value={{
        job,
        addJob,
        removeJob,
        editJob,
        changeStatusJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJob(): JobContextData {
  const context = useContext(JobContext);

  return context;
}
