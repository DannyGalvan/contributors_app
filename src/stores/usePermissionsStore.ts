import { create } from 'zustand';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
} from 'react-native-permissions';

export type PermissionKey = 'location' | 'camera';

export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'blocked'
  | 'limited';

export type PermissionsState = Record<PermissionKey, PermissionStatus>;

const ANDROID_PERMISSION_MAP: Record<PermissionKey, Permission> = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  camera: PERMISSIONS.ANDROID.CAMERA,
};

const initialState: PermissionsState = {
  location: 'unavailable',
  camera: 'unavailable',
};

interface PermissionsStore {
  permissions: PermissionsState;
  isChecking: boolean;

  /** Check a single permission without requesting it. Returns its status. */
  checkPermission: (key: PermissionKey) => Promise<PermissionStatus>;

  /** Request a single permission. Returns the resulting status. */
  requestPermission: (key: PermissionKey) => Promise<PermissionStatus>;

  /** Check all permissions and update the store. */
  checkAll: () => Promise<void>;

  /** Open OS settings (call only after explaining why to the user). */
  openAppSettings: () => void;
}

export const usePermissionsStore = create<PermissionsStore>((set) => ({
  permissions: initialState,
  isChecking: false,

  checkPermission: async (key: PermissionKey): Promise<PermissionStatus> => {
    set({ isChecking: true });
    try {
      const permission = ANDROID_PERMISSION_MAP[key];
      const result = await check(permission);
      const status = result as PermissionStatus;
      set((s) => ({
        permissions: { ...s.permissions, [key]: status },
        isChecking: false,
      }));
      return status;
    } catch {
      set({ isChecking: false });
      return 'unavailable';
    }
  },

  requestPermission: async (key: PermissionKey): Promise<PermissionStatus> => {
    set({ isChecking: true });
    try {
      const permission = ANDROID_PERMISSION_MAP[key];
      const result = await request(permission);
      const status = result as PermissionStatus;
      set((s) => ({
        permissions: { ...s.permissions, [key]: status },
        isChecking: false,
      }));
      return status;
    } catch {
      set({ isChecking: false });
      return 'unavailable';
    }
  },

  checkAll: async (): Promise<void> => {
    set({ isChecking: true });
    try {
      const [locationResult, cameraResult] = await Promise.all([
        check(ANDROID_PERMISSION_MAP.location),
        check(ANDROID_PERMISSION_MAP.camera),
      ]);
      set({
        permissions: {
          location: locationResult as PermissionStatus,
          camera: cameraResult as PermissionStatus,
        },
        isChecking: false,
      });
    } catch {
      set({ isChecking: false });
    }
  },

  openAppSettings: () => {
    openSettings();
  },
}));
