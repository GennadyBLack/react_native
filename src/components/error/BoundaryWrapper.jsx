import React from "react";
import ErrorBoundary from "./ErrorBoundary";

export default function EW({ component }) {
  return <ErrorBoundary>{component}</ErrorBoundary>;
}
