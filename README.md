[Читать на русском](README.ru.md)

# Nucleus sketch plugin
It is a tool that allows to create an atomic design in Scetch, as well as to export page-making data from the layout as an scss map. It is intended to create re-used design systems.

![Scheme-nucleons](https://github.com/levtolstoi/Nucleus/blob/assets/scheme-nucleons.jpg?raw=true)
![Scheme-atoms](https://github.com/levtolstoi/Nucleus/blob/assets/scheme-atom.jpg?raw=true)

With Nucleus, design creation is only available if you organize the guideline and the library of components according to certain rules, which form the framework for design. Thus, the unity of language is set up for the design and the development by exporting data from the guideline. Data export provides synchronization of the design layouts and appearance of the browser’s components. This is close to wysiwyg principle, but you can decide yourself how to use data in the code.

[You can download demo here](https://github.com/levtolstoi/Nucleus-demo).

## Installation
To install, download a [zip-archive](https://github.com/levtolstoi/Nucleus/releases/download/v1.0.4/Nucleus.sketchplugin.zip) containing the latest release, extract it and click twice on Nucleus.sketchplugin.

## Nucleons and Synchronization
In the plugin’s context, atomic design is expanded with smaller particles — nucleons, which can totally replace Sketch Styles and Sketch Text Styles when used with hashtags in the layer name. So that is how the updated concept looks like:

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/nucleons.jpg?raw=true)

**Nucleons** (derived from Latin) are either protons or neutrons, which construct an atomic nucleus.

In the context of Nucleus, nucleons are regular Sketch layers, each of which stores a certain property, for example, width, height, shadow, etc.

![Example height](https://github.com/levtolstoi/Nucleus/blob/assets/nucleons.png?raw=true)

There are in total 9 tag prefixes available:
* **«h-»** (height);
* **«w-»** (width);
* **«o-»** (offset): indent, refers to the layer width;
* **«r-»** (radius);
* **«s-»** (shadow): may store an inner shadow as well as outer one or both of them at once (the borders should also be stored at those nucleons, as sketch cannot create borders at only one of the layers side);
* **«b-»** (background): allows you to store the layers colors;
* **«t-»** (typographic): allows you to store font-size, font-family, letter-spacing, line-height, text-transform (uppercase/lowercase), font-weight;
* **«с-»** (color) text color;
* **«i-»** (icon): for icons. If you apply this nucleon to any layer, it will be replaced with an icon when synchronized; the original icon may be changed further.


## Sync Command (cmd+shift+i)
You may synchronize the properties of nucleons and layers inside the symbols through hashtags.

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/sync.gif?raw=true)

That is how it works:

![Image alt](https://github.com/levtolstoi/Nucleus/blob/assets/sync-scheme.jpg?raw=true)


### Creating Nucleons
To make nucleons, you first need to create an artboard named Nucleons (necessarily). This name provides an area of visibility for synchronizing the nucleons and layers properties in Sketch symbols to which the tags have been applied to.

Video tutorial on Youtube:

[![Nucleus create nucleons](https://img.youtube.com/vi/wEt_Y7tL2cw/0.jpg)](https://youtu.be/wEt_Y7tL2cw)

Nucleons artboard appears to be a kind of elementary particles database, and the mechanisms of interaction with them are laid in their names, and that is how it looks like:

**nucleon#h-sm-s**

In this example:
* «nucleon» is a necessary name through which Nucleus refers to the proper layer for some of the layer properties (necessarily);
* '#' symbol (hashtag/sharp/octothorpe) separates the layer name from the tag (necessarily);
* «h-» is a prefix that indicates which exactly property should be derived from the nucleon (in this example h is height);
* «sm-s» is a unique name (may be any one). It is recommended to use abstract names (e. g. sm-xs, sm-m, sm-xlg-xl).

---
**Nucleons properties may only be synchronized to layers (if there are tags in their names) in the master symbols, which can be found at the symbols page.**
---

Let’s consider how to create a nucleon using a nucleon of height (h-) as an example:

1. At the artboard named “Nucleons” create a Sketch group named “nucleons_name”; in our case, “nucleons_height”. In fact, it can be called any way, you can use your own ideas, but it is recommended to hold on a uniform style.

2. In the group create layers named nucleon with a hashtag designating the property. As far as we are creating a height nucleon, the name will be “nucleon#h-heigh-name”.

3. In the nucleons_name group, there cannot be any other layers except of nucleon (add any graphical tips and comments you like outside the group).

There cannot be two similar nucleons: a nucleon corresponds to a layer (except of icons: icons’ nucleons are Sketch groups, but the rules are same).

4. All the nucleons’ types should be created to cover the full atomic layers for the further synchronization.
Any number of nucleons may be created as long as you don’t get confused with them.

## Creating an Atom
The concept of an atomic design considers atoms as some whole and independent items which have no sense on their own, but the context of their usage is assumed. For this reason, try to reduce the atom re-using. It is better to create more numerous nucleons that look mostly similar to each other (it is called “matching”) – that increases the abilities for spot control of the usage. Don’t forget that every atom is going to be considered individually in the page-making process, just like in a guideline.

Video tutorial on youtube:

[![Nucleus create nucleons](https://img.youtube.com/vi/JMWxw-i4V-M/0.jpg)](https://youtu.be/JMWxw-i4V-M)

If you have created an artboard named Nucleons, you should create another one especially for atoms.

It is essential to decide the structure of the layer tree and hold on it constantly when creating new atoms. The structure suggested is:
* Every atom should be a symbol.
* Default, active, hover are atom’s states.
* There can be any number of atom’s states.
* State atoms creation is strictly necessary for every atom item.

Every single symbol in the atom group is called an atom item. 

If we look inside an atom:
![Слои атома](https://github.com/levtolstoi/Nucleus/blob/assets/inside-atom.png?raw=true)

«button / primary / sm / default» — name / theme / size / state. The slashes are necessary for the convenience of further navigation in the symbol library.

"button-primary-sm" is a name for a group which contains the atom layers. It must have no spaces; the state indication should be skipped. The group wrapping the layers is necessary and should wrap all the layers in the symbol. Be attentive: that is the name that the atom is going to get during the page making, if the developer doesn’t change it in the code. That is why you should act consistently, not attributing state’s names to the atoms.

### Layers in Detail
The layers names consist of two parts. Everything that is written before the first #-symbol is called a layer name, and everything after the symbol is a nucleon chain. The mail rule is: no spaces.

You should remember that the number of the basic layers in any atom item of one type cannot be changed as well as their names, as that is a template. But you can also add extra layers (e. g. an icon) from one item to another. Meanwhile, nucleons, their type and order may me changed in any ways. However, you shouldn’t designate text atoms as ordinary layers or vice versa.

In this example layers named offset are presented. As we remember, the hashtag with #o- prefix is a nucleon that has an indent size through all its width. Those layers are more important for the developers in the exporting atoms code. Unfortunately, Sketch offers no abilities to make indents.

Let’s skim the necessary rules:
* aim at reducing atom’s functionality: better create more numerous rather than universal ones;
* properties synchronization between the layers of nucleons and layers of atoms only processes if the atom is a symbol;
* create atoms at the separated artboards, not at those which already have nucleons;
* spaces are allowed only in the name of a symbol atom;
* layers of a symbol atom should always be wraped in a group with name of the atom; only the size modifier may be changed in the name of an atom; create a new atom for a new theme;
* display of states is necessary: even if there is only one state, you should create a group (the reason will seem obvious when you read a section on css generation);
* names of layers should be readable and have no spaces, they are repeated from item to an item of the symbol atom;
* there is always similar number of layers in every item of symbol atom;
* you cannot use similar names for two or more layers at one symbol.


## Data Export (cmd+shift+b)

![Схема](https://github.com/levtolstoi/Nucleus/blob/assets/export-scheme.jpg?raw=true)

We all know the Copy CSS Attributes command in Sketch, so we already realize that Sketch contains all the data necessary for the page-making. Still, for some reason we write css manually. Nucleous partly fixes that. If you have created the atoms structure properly, as it is described above, you can export scss map from the layout: one atom for one map.


![экспорт](https://github.com/levtolstoi/Nucleus/blob/assets/export.gif?raw=true)
