import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const LazyLoad = (importFunc: any) => {
    const LazyComponent = lazy(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(importFunc());
            }, 1000);
        });
    });
    //const LazyComponent = lazy(importFunc);

    return (props: any = undefined) => (
        <Suspense fallback={<Loading />}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

export default LazyLoad;
