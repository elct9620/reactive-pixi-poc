import { useState, useEffect } from "react";
import { Subject, mergeAll, scan, withLatestFrom } from "rxjs";
import { bind } from "@react-rxjs/core";
import { Assets, ArrayOr } from "pixi.js";

const assets$ = new Subject<Promise<void>>();
const assetsProgress$ = assets$.pipe(mergeAll());
const assetsCount$ = assets$.pipe(scan((acc) => acc + 1, 0));
const [useAssetIsLoading, isAssetsLoading$] = bind(
  assetsProgress$.pipe(
    scan((acc) => acc + 1, 0),
    withLatestFrom(assetsCount$, (current, total) => current < total),
  ),
  false,
);

isAssetsLoading$.subscribe();

const useAssets = <T>(assetsUrls: ArrayOr<string>) => {
  const [assets, setAssets] = useState<Record<string, T>>({});

  useEffect(() => {
    const promise = Assets.load(assetsUrls);
    assets$.next(promise);
    promise.then((res) => setAssets(res));
  }, [assetsUrls]);

  return assets;
};

export { useAssets, useAssetIsLoading };
