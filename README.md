## author
```
name: xiaozhenggaomashi
```

**Dependency tools**
```
yarn - v1.5.1
```

**To Start**
```
mkdir xw-weapp-next
cd xw-weapp-next
yarn init -y  (crete package.json)
yarn install --save react react-dom next
mkdir pages
```

**Start Server**

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

