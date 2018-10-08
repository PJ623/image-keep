# Image Keep

Image Keep is a gallery web application that can store images from the web into browser storage for offline viewing.


Currently, Image Keep uses [CORS Anywhere](https://cors-anywhere.herokuapp.com/) to fetch images that are not accessible using Cross-Origin Resource Sharing (CORS).


Image Keep is meant to be saved in local storage so that it can be used offline, but an online version of Image Keep [here](https://pj623.github.io/image-keep/). Please note that in my personal testing, GitHub Pages hosting (as much as I love it) causes Image Keep to encounter 403 Forbidden Errors during image retrieval from certain sites that the offline version of Image Keep does not encounter.


Image Keep utilizes icons from [GLYPHICONS.com](http://www.glyphicons.com/) under the [Creative Commons Attribution 3.0 Unported License (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/).


## Setup

1. Download Image Keep. (download link: [ZIP file](https://github.com/PJ623/image-keep/archive/master.zip))
2. Extract Image Keep into a directory of your choosing.
3. Open Image Keep in a browser. (ex. on an Android browser, visit file//:sdcard/[your specified extraction directory]/image-keep-master/index.html)


## Usage Instructions

### Adding an Image to Your Gallery

1. Find an image on the web.
2. Copy the image's URL.
3. Paste the URL into Image Keep's textbox.
4. Press the '+' button. (Note that due to the fact that some sites do not have Cross-Origin Resource Sharing enabled, images from those sites may fail to be added into the gallery.)


### Viewing an Image

1. Press on the image you wish to view to view an enlarged version of the image.
2. Press on the enlarged image to close the enlarged image.


### Deleting an Image from Your Gallery

1. Press the 'gear' button on the bottom right of the Image Keep page.
2. Press the newly appeared 'x' button that is associated to the image you want to delete from your gallery.