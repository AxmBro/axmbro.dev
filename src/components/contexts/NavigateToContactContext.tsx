// import React, { createContext, useContext, useState, ReactNode, FC } from "react";

// interface NavigateToContactType {
//   navigateToContact: boolean;
//   setNavigateToContact: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const NavigateToContact = createContext<NavigateToContactType | undefined>(undefined);

// const NavigateToContactProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [navigateToContact, setNavigateToContact] = useState(false);

//   return (
//     <NavigateToContact.Provider value={{ navigateToContact, setNavigateToContact }}>
//       {children}
//     </NavigateToContact.Provider>
//   );
// };

// const useHomeRoute = (): NavigateToContactType => {
//   return useContext(NavigateToContact)!;
// };

// export { NavigateToContact, NavigateToContactProvider, useHomeRoute };
