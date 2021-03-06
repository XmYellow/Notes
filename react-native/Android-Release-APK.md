# Android签名文件生成

标签： react-native android

---

> 打包安卓release包如果有编译成功，但是打开软件闪退的情况，可以参考第5步，检查是否没有生产assets等目录。

 **1. keytool命令生成签名秘钥**

    keytool -genkey -v -keystore my-release-key.keystore  -alias
    my-key-alias -keyalg RSA -keysize 2048 -validity 10000

> 
> 
> 上面的**my-release-key**这个名字可以自己取名，同时**my-key-alias**也是自己取名，其中第二个名称alias参数后边的别名，在后面你在为应用签名的时候需要用到，所以暂时记录一下这个别名。
> 
> 
>  上面的命令我们需要输入密钥库(keystore)密码和对应秘钥的密码，然后设置名字，组织，国家，省份相关的信息，最后会生成**my-release-key.keystore**的签名文件。
> 

 **2. Gradle配置**

> 首先我们要把刚刚生成的签名文件复制到项目**android/app**文件夹下面(这边采用AS生成签名test.jks)。
>
> 然后进行修改项目中**gradle.properties**文件，进行添加如下的代码(注意下面的签名和别名的名称和上一步放入的test.jks要一样，下面两项分别填写签名和别名的密码)-我取的密码为ztt12345

    MYAPP_RELEASE_STORE_FILE=test.jks
    MYAPP_RELEASE_KEY_ALIAS=test_alias
    MYAPP_RELEASE_STORE_PASSWORD=ztt12345
    MYAPP_RELEASE_KEY_PASSWORD=ztt12345

> 这一步我们是进行全局的gradlde进行变量化的配置，后边我们会在后边的步骤中给相应的应用进行签名。
>
> [注意].以上的签名秘钥请大家一定要妥善保管，因为在应用发布的时候需要的。


**3. 给应用添加签名-配置局部应用Gradle文件**


>  直接在工程目录下得**android/app/build.gradle**中以下节点添加如下内容:

       ...
        android {
            ...
            defaultConfig { ... }
            signingConfigs {
                release {
                    storeFile file(MYAPP_RELEASE_STORE_FILE)
                    storePassword MYAPP_RELEASE_STORE_PASSWORD
                    keyAlias MYAPP_RELEASE_KEY_ALIAS
                    keyPassword MYAPP_RELEASE_KEY_PASSWORD
                }
            }
            buildTypes {
                release {
                    ...
                    signingConfig signingConfigs.release
                }
            }
        }
        ...

**4. 对存在react.gradle文件的项目打包**


      cd android && ./gradlew assembleRelease

**5. 对与不存在react.gradle文件的项目打包**

> 首先命令切换到该react native项目的主目录，然后运行以下的命令，生成**assets**文件夹

    mkdir -p android/app/src/main/assets

>   紧接着运行以下命令，进行生成**inde.android.bundle**文件

    react-native bundle --platform android --dev false --entry-file index.android.js \
      --bundle-output android/app/src/main/assets/index.android.bundle \
      --assets-dest android/app/src/main/res/

**6. 最后运行之前的命令，进行代码和资源文件打包，生成的带有签名的apk还是在上面的目录中**


      cd android && ./gradlew assembleRelease

**7. 上面的步骤我们已经完成了项目的签名打包在对应的目录中生成中apk文件，下面我们直接运行以下的命令进行将apk安装到设备中，我这边直接采用了模拟器进行测试了**

     cd android && ./gradlew installRelease



[参考链接]

[图文详解][1]


  [1]: http://www.lcode.org/%E3%80%90react-native%E5%BC%80%E5%8F%91%E3%80%91react-native%E8%BF%9B%E8%A1%8C%E7%AD%BE%E5%90%8D%E6%89%93%E5%8C%85%E6%88%90apk/