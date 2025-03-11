import { create } from 'zustand';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
} from 'react-native-permissions';

export type permissionsKey = 'location' | 'camera';

export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'blocked'
  | 'limited';

export type PermissionState = {
  [key in permissionsKey]: PermissionStatus;
};

export const permissionsInitialState: PermissionState = {
  location: 'unavailable',
  camera: 'unavailable',
};

interface PermissionStoreState {
  permissions: PermissionState;
  isPendingPermissions: boolean;
  requestPermission: (permissiona: Permission, name: permissionsKey) => void;
  queryPermissions: (permissiona: Permission, name: permissionsKey) => void;
  askPermission: (permissiona: Permission) => void;
  checkPermission: (permissiona: Permission) => void;
}

export const usePermissionsStore = create<PermissionStoreState>((set, get) => ({
  permissions: permissionsInitialState,
  isPendingPermissions: false,
  requestPermission: async (permissionsa: Permission, name: permissionsKey) => {
    set({ isPendingPermissions: true });

    const requestPermission = await request(permissionsa);
    if (requestPermission === 'blocked') {
      openSettings();
    }

    set({
      permissions: { ...get().permissions, [name]: requestPermission },
      isPendingPermissions: false,
    });
  },
  askPermission: async (permissionsa: Permission) => {
    switch (permissionsa) {
      case PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION:
        get().requestPermission(permissionsa, 'location');
        break;
      case PERMISSIONS.ANDROID.CAMERA:
        get().requestPermission(permissionsa, 'camera');
        break;
      default:
        set({ permissions: permissionsInitialState });
        break;
    }
  },
  queryPermissions: async (permissionsa: Permission, name: permissionsKey) => {
    set({ isPendingPermissions: true });

    const checkPermission = await check(permissionsa);
    if (checkPermission === 'blocked') {
      openSettings();
    }

    set({
      permissions: { ...get().permissions, [name]: checkPermission },
      isPendingPermissions: false,
    });
  },
  checkPermission: async (permissionsa: Permission) => {
    switch (permissionsa) {
      case PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION:
        get().queryPermissions(permissionsa, 'location');
        break;
      case PERMISSIONS.ANDROID.CAMERA:
        get().queryPermissions(permissionsa, 'camera');
        break;
      default:
        set({ permissions: permissionsInitialState });
        break;
    }
  },
}));
