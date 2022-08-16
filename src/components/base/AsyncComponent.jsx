import React, { Suspense, useMemo } from "react";

import InlineLoader from "@/components/loader/inlineLoader";

const AsyncComponent = ({ component, ...props }) => {
  const Component = useMemo(() => React.lazy(() => component()), [component]);

  return (
    <Suspense fallback={<InlineLoader classModifiers="component-loader" />}>
      <Component {...props} />
    </Suspense>
  );
};

export default AsyncComponent;
