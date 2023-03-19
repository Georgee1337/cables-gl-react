declare global {
    interface CablesPatchOptions {
      patch?: any;
      onPatchLoaded?: (patch: any) => void;
      onFinishedLoading?: (patch: any) => void;
      [key: string]: unknown;
    }
  
    interface Cables {
      exportedPatch: any;
      patch: any;
      Patch: new (options: CablesPatchOptions) => any;
    }
  
    const CABLES: Cables;
  }
  
  export {};
  