#Rich-Text-Editor

A fully functional Rich Text Editor for both Android and iOS, based off the [ZSSRichTextEditor](https://github.com/wix/react-native-zss-rich-text-editor) project.

##Installation

`npm i --save https://gregory.galushka@gitlab.intecracy.com/LabArchives/rich-text-editor.git`
`react-native link rich-text-editor`

Also if you see errors try run this:
`react-native link react-native-image-picker`
`react-native link react-native-webview-bridge-updated`

Check if not configured before:
	https://github.com/react-community/react-native-image-picker
	https://github.com/wix/react-native-webview-bridge


##Android bug

1. Each time after creating the bundles, delete the file `node_modules_reactnativezssrichtexteditor_src_editor.html` in the folder `project_folder/android/app/src/main/res/drawable-mdpi`
2. Build and run project
##
