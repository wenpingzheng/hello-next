## author
```
@name: xiaozhenggaomashi
@time: 2017-10-09
@uptime: 2018-09-10
```

## Dependency tools
```
node - v6.9.1
npm - 3.10.8
yarn - v1.5.1
```
## To Start

**STEP 1**

create directory
```
mkdir xw-weapp-next
cd xw-weapp-next
yarn init -y  (crete package.json)
yarn install --save react react-dom next
mkdir pages
```
**STEP 2**

open the "package.json" in the xw-weapp-next directory and add the following NPM script.
```
{
  "scripts": {
    "dev": "next"
  }
}
```
Now everything is ready, Run the following command to start the dev server
```
yarn dev (auto create .next)
```

## Export into a static HTML App

Now we are going to export out index page(pages/index.js) as a static HTML page.

**STEP 1**

First of all, create a file called next.config.js in the root of your app and add the following content.
```
module.exports = {
  exportPathMap: () => {
    return {
      '/': { page: '/', query: { static: true } }
    }
  }
} 
```
**STEP 2**

Then add the following NPM scripts into the package.json.
```
"scripts": {
  "dev": "next",
  "build": "next build && next export"
},
```

**STEP 3**

Then run the following commands.
```
npm run build
``` 
Of course yan can use yarn to build it also, like this
```
yarn build
``` 





