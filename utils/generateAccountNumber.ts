import Account from "../app/account/account.model";

// This function is meant to create unique acount number for the user

export async function generateUniqueAccountNumber()
{
    let isUnique = false;
    let accountNumber;


    while (!isUnique) {

        accountNumber = Math.floor(1000000000 + Math.random() * 1000000000);

        // Check if the generated account number already exists in the database
        const existingAccount = await Account.findOne({ account_number: accountNumber });

        // If no existing account is found, the generated account number is unique
        if (!existingAccount) {
            isUnique = true;
        }
    }

    return accountNumber;
}
