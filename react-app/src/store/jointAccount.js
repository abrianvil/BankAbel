

/********************TYPES******************* */

const LOAD_JOINT_ACCOUNTS = 'jointAccounts/LOAD';
const LOAD_ONE_JOINT_ACCOUNT = 'jointAccounts/LOAD_ONE';
const CREATE_JOINT_ACCOUNT = 'jointAccounts/ADD';
const REMOVE_JOINT_ACCOUNT = 'jointAccounts/REMOVE';
const EDIT_JOINT_ACCOUNT = 'jointAccounts/EDIT';
const CLEAR_JOINT_ACCOUNT = 'jointAccounts/CLEAR'


/*******************ACTION CREATORS*********** */

const loadJointAccounts = (jointAccounts) => ({
    type: LOAD_JOINT_ACCOUNTS,
    accounts
})

const loadOneJointAccount = (jointAccount) => ({
    type: LOAD_ONE_JOINT_ACCOUNT,
    account
})

const addJointAccount = (newJointAccount) => ({
    type: CREATE_JOINT_ACCOUNT,
    newAccount
})

const removeJointAccount = (jointAccountId) => ({
    type: REMOVE_JOINT_ACCOUNT,
    accountId
})

const editJointAccount = (jointAccount) => ({
    type: EDIT_JOINT_ACCOUNT,
    account
})

export const clearJointAccount = () => ({
    type: CLEAR_JOINT_ACCOUNT
})
