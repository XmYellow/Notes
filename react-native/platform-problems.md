# 一些小问题

标签： react-native style-sheet

---

 **1. 状态栏StatusBar**

> 前几天打包Android和ios的APK到手机上的时候，发现安卓机子上有显示状态栏，而苹果机子上一片黑，找了半天样式问题都没有找到，后来发现是两个系统的状态栏默认配色不一样。

      <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
       />

> 状态栏样式 
default - 默认的样式（IOS为白底黑字、Android为黑底白字） 
light-content - 黑底白字
dark-content - 白底黑字

 **2. 输入框TextInput**
 
    <View style={{ borderBottomColor: '#808080', borderBottomWidth:1}}> 
    <TextInput
        borderBottomColor={'rgba(255,255,255,0.3 )'}
        underlineColorAndroid={'transparent'}
    />
    </View>
    
> 对输入框设置borderBottomColor的时候在Android有效，ios无效，查看文档的时候发现当multiline=false时，为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效。为了能够实现效果你可以使用一个View来包裹TextInput。TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding:0，同时设置underlineColorAndroid="transparent"来去掉底边框。

 **3. 安卓和ios设置不同样式**
 
> 由于安卓手机和苹果手机样式上的细微差异，可以简单的使用react-native的Platform来区分系统

     textInfo: {
        lineHeight: (Platform.OS === 'ios') ? 45 : 32,
    }
    
    

       




