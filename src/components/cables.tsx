import React, { useEffect, useRef } from 'react';

interface CablesPatchProps {
  canvasId?: string;
  patchDir?: string;
  patchOptions?: CablesPatchOptions;
}

const CablesPatch: React.FC<CablesPatchProps> = (props) => {
  const canvasId = props.canvasId || 'glcanvas';
  const patchDir = props.patchDir;
  const patchOptions = useRef<CablesPatchOptions>({
    prefixAssetPath: patchDir,
    jsPath: patchDir + '/js/',
    glCanvasId: canvasId,
    glCanvasResizeToWindow: true,
    canvas: { alpha: true, premultipliedAlpha: true },
    ...props.patchOptions,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = patchDir + '/js/patch.js';
    script.async = true;
    script.onload = initPatch;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initPatch = () => {
    const options = patchOptions.current;
    if (!options.patch) options.patch = CABLES.exportedPatch;
    if (!options.onPatchLoaded) options.onPatchLoaded = patchInitialized;
    if (!options.onFinishedLoading) options.onFinishedLoading = patchFinishedLoading;
    CABLES.patch = new CABLES.Patch(options);
  };

  const patchInitialized = (patch: any) => {
    console.log(patchDir + ' initialized');
  };

  const patchFinishedLoading = (patch: any) => {
    console.log(patchDir + ' finished loading');
  };

  return <canvas id={canvasId} ></canvas>;
};

export default CablesPatch;
