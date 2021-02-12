import { useState, useContext, createContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

export const BreadcrumbContext = createContext();

export const useBreadcrumbContext = () => {
    const context = useContext(BreadcrumbContext);
  
    if (!context) {
      throw new Error("Missing BreadcrumbProvider.");
    }
  
    return context;
};

export const BreadcrumbPortal = () => {
    const portalNodeRef = useRef();
    const [, setPortalNode] = useBreadcrumbContext();
  
    useEffect(() => {
      setPortalNode(portalNodeRef.current);
    }, []);
  
    return (
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul ref={portalNodeRef} ></ul>
      </nav>
    );
  };

export const BreadcrumbProvider = ({ children }) => {
    const portalNodeState = useState();

    return (
      <BreadcrumbContext.Provider value={portalNodeState}>{children}</BreadcrumbContext.Provider>
    );
};

export function Breadcrumb({children, to}) {
    const [portalNode] = useBreadcrumbContext();

    return portalNode
    ? 
    ReactDOM.createPortal(
        <li>
            <Link to={to}>{children}</Link>
        </li>
        ,
        portalNode
    )
    : null;

}