import { ReactNode, createContext } from "react";
import useFetchData from "./hooks/useFetchData";
import { CountryDetailTypes } from "./types";

export type  FetchDataResult ={
  data: CountryDetailTypes | [] ;
  error: boolean;
  loading: boolean;
}

interface CountryProviderProps {
  url: string;
  children: ReactNode;
}

export const CountryContext = createContext<FetchDataResult | undefined>( undefined);

export const CountryProvider: React.FC<CountryProviderProps> = ({ url, children, }) => {
  const { data, error, loading } = useFetchData(url);

  return (
    <CountryContext.Provider value={{ data, error, loading }}>
      {children}
    </CountryContext.Provider>
  );
};
