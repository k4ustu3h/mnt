import { createContext, useContext } from "react";

export const WallpaperContextObj = createContext();

export default function useWallpaper() {
	return useContext(WallpaperContextObj);
}
