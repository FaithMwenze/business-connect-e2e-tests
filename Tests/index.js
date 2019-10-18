
const createTestCafe = require('testcafe');
let testcafe         = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe     = tc;
        const runner = testcafe.createRunner();

        return runner
            .src(['./Tests/'])
            .browsers(['edge'])
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });
// const createTestCafe =  require('testcafe')

// const createBrowserConnection = async () => {
//     let testcafe = null
//     const testcontroller = await createTestCafe('localhost', 1337, 1338);
//     testcafe = testcontroller
//     const runner = testcafe.createRunner();  
    
//     try{
//        return  await runner.src(["./Tests/"])
//                    .browsers('chrome')
//                     .run()
//                     .then(() =>  testcafe.close())
               
//     }catch(error){
//         testcafe.close()
//         throw new Error(error)
//     }
// }
// createBrowserConnection()