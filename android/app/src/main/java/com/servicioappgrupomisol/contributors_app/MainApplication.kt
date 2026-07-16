package com.servicioappgrupomisol.contributors_app

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost  by lazy {
      getDefaultReactHost(
        context = applicationContext,
        packageList =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            },
      )
  }

  override fun onCreate() {
    super.onCreate()
    if (BuildConfig.DEBUG) {
      // Android emulator reaches host machine via 10.0.2.2 instead of localhost
      getSharedPreferences("$packageName.debug", Context.MODE_PRIVATE)
        .edit()
        .putString("debug_http_host", "10.0.2.2:8081")
        .apply()
    }
    loadReactNative(this)
  }
}