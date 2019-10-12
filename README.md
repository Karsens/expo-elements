# Expo Elements

All kinds of small components that aren't inputs. 

#todo:
Create a good documentation for this. It's the most important aspect of such a library, to have an easy way to read back what things do, for me and for others.

How to distribute?

**LECKR Package**
In the "leckr" package (similar to Expo Managed Apps)

Everything in UX namespace or loose? Try both

`import { UX, BigButton } from "leckr";`

then, use...

`<UX.BigButton ... />` or `<BigButton ... />`

**UX Package**

In the "leckr-ux" npm package (similar to Expo Bare)

**Loose packages**

Every element should have its own readme and also should be loosely importable through one of these package names, depending on usecase:

- `leckr-ux-{elementname}`
- `leckr-{elementname}`
- `expo-{elementname}`
- `react-native-{elementname}`

These should all adhere the new importing convention without `export default`s