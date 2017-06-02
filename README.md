#Rich-Text-Editor

A fully functional Rich Text Editor for both Android and iOS, based off the [ZSSRichTextEditor](https://github.com/nnhubbard/ZSSRichTextEditor/tree/master/ZSSRichTextEditor) project. 

##Installation

`npm i --save https://gregory.galushka@gitlab.intecracy.com/LabArchives/rich-text-editor.git`

##

Before you start, you need to install and connect the following modules to your project

`npm i --save react-native-image-picker`

LINK https://github.com/wix/react-native-webview-bridge

//------------------------------

`npm i --save react-native-webview-bridge-updated`

##Installation for IOS

LINK https://github.com/wix/react-native-webview-bridge

##

##Installation for Android

1. Add the following import to `MainApplication.java`
	```java
	import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
	```

2. Add the following code to add the package to `MainApplication.java`
	``` java
	protected List<ReactPackage> getPackages() {
	    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new WebViewBridgePackage() //<- this
	    );
	}   
	```

3. Add the following codes to your `android/setting.gradle`:
you might have multiple 3rd party libraries, make sure that you don't create multiple include.
	```gradle
	include ':app', ':react-native-webview-bridge'
	project(':react-native-webview-bridge').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview-bridge-updated/android') //<- warning
	```

4. Edit `android/app/build.gradle` and add the following line inside dependencies
	```gradle
	dependencies {
		compile project(':react-native-webview-bridge')
	}
	```

5. Copy the folder `node_modules/rich-text-editor/src/MathJax` and paste it into `the project_folder/android/app/src/main/assets`

6. Add the following to the end of your `android/app/build.gradle`:
	```groovy
	project.afterEvaluate {
	    apply from: '../../node_modules/rich-text-editor/htmlCopy.gradle';
	    copyEditorHtmlToAppAssets(file('../../node_modules/rich-text-editor'))
	}
	```
7. Each time after creating the bundles, delete the file `node_modules_reactnativezssrichtexteditor_src_editor.html` in the folder `project_folder/android/app/src/main/res/drawable-mdpi`
8. Build and run project
##
