import Account from './Account';



export default class AccountCloudDatabase {

    constructor(){
        
    }

    addAccountToDatabase(username, password) {

        const account = {
            'Name': username,
            'Password__c': password
        }

        let id = ''

        conn.sobject('Account').create(account, function(error, response) {

            if (error || !response.success) {
                return console.err(error, response);
            }
            id = response.id;
            console.log('Created account id: ' + response.id)
        })

        return new Account(account.Name, account.Password__c, id)
    }

    doesAccountExist(username, password) {
        const accountsList = this.getListOfAccounts();

        accountsList.forEach((database_account) => {
            if (
                username === database_account.Name && 
                password === database_account.Password__c
            ) 
            {
                return true;
            }
        })
    }

    getListOfAccounts() {
        // Query account records
        conn.query("SELECT Name, Password__c FROM Account", function(err, result) {
            if (err) { return console.error(err); }

            const accountsList = []
            // Process retrieved records
            result.records.forEach(function(record) {
                accountsList.push(record);
            });

            return accountsList;
        });
    }
}