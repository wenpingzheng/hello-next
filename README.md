## author
```
@name: xiaozhenggaomashi
@time: 2017-10-09
@uptime: 2018-09-10
```

**Dependency tools**
```
node - v6.9.1
npm - 3.10.8
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

