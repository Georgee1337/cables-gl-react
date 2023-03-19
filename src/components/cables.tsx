import React, { useEffect, useRef } from 'react';

interface CablesPatchProps {
  canvasId?: string;
  patchDir?: string;
  patchOptions?: CablesPatchOptions;
}

const CablesPatch: React.FC<CablesPatchProps> = ({
  canvasId = 'glcanvas',
  patchDir = '/patch/',
  patchOptions = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mergedPatchOptions = useRef<CablesPatchOptions>({
    prefixAssetPath: patchDir,
    jsPath: patchDir + '/js/',
    glCanvasId: canvasId,
    glCanvasResizeToWindow: true,
    canvas: { alpha: true, premultipliedAlpha: true },
    ...patchOptions,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = patchDir + '/js/patch.js';
    script.async = true;
    script.onload = initPatch;
    document.body.appendChild(script);

    window.addEventListener('resize', updateCanvasSize);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const initPatch = () => {
    const options = mergedPatchOptions.current;
    if (!options.patch) options.patch = CABLES.exportedPatch;
    if (!options.onPatchLoaded) options.onPatchLoaded = () => console.log(patchDir + ' initialized');
    if (!options.onFinishedLoading) options.onFinishedLoading = () => console.log(patchDir + ' finished loading');
    CABLES.patch = new CABLES.Patch(options);
    updateCanvasSize();
  };

  const updateCanvasSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id={canvasId}
      tabIndex={1}
      className="full-screen-canvas"
    ></canvas>
  );
};

export default CablesPatch;
