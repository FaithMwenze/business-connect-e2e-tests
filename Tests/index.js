const createTestCafe =  require('testcafe')

const createBrowserConnection = async () => {
    const testcontroller = await createTestCafe('localhost', 1337, 1338);
    testcafe = testcontroller
    const runner = testcafe.createRunner();  
    
    try{
       return  runner.src(["./test.js"])
                   .browsers('chrome')
                    .run()
               
    }catch(error){
        testcafe.close()
        throw new Error(error)
    }
}
createBrowserConnection()