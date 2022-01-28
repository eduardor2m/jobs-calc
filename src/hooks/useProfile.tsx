import { createContext, ReactNode, useContext, useState } from 'react';

interface ProfileProviderProps {
  children: ReactNode;
}

type Profile = {
  id: string;
  name: string;
  url: string;
  valueHour: number;
};

interface ProfileContextData {
  profile: Profile;
  addProfile: (profile: Profile) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>(
  {} as ProfileContextData
);

export function ProfileProvider({
  children,
}: ProfileProviderProps): JSX.Element {
  const storageKey = '@ProfilesCalc:Profiles';

  const [profile, setProfile] = useState<Profile>(() => {
    if (typeof window !== 'undefined') {
      const storagedProfile = localStorage.getItem(storageKey);

      if (storagedProfile) {
        return JSON.parse(storagedProfile);
      }
    }

    return [];
  });

  const addProfile = async (newProfile: Profile) => {
    try {
      setProfile(newProfile);
      localStorage.setItem(storageKey, JSON.stringify(newProfile));
    } catch {
      throw new Error('Erro na adição do produto');
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        addProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  return context;
}
