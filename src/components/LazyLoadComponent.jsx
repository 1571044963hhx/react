// LazyLoadComponent.js
import { Suspense } from 'react';

const LazyLoadComponent = ({ Component }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export default LazyLoadComponent;

