// import React from 'react';
// import { createStore } from './appStore';
// import { useLocalStore } from 'mobx-react';

// const AppContext = React.createContext(null);

// export const AppProvider = ({ children }) => {
//   const appStore = useLocalStore(createStore);

//   return (
//     <AppContext.Provider value={appStore}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppStore = () => React.useContext(AppContext);