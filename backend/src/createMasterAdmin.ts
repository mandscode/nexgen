// scripts/createMasterAdmin.ts

import currencyService from "./services/currency.service";
import roleService from "./services/role.service";
import userService from "./services/user.service";



async function createMasterAdmin() {
    await roleService.ensureRolesExist();
    await currencyService.ensureCurrenciesExist();

    const adminRole = await roleService.getRoleByName("Master Admin");
    
    if (!adminRole) {
        console.error("Admin role not found. Cannot create master admin.");
        return;
    }

    const masterAdmin = {
        email: 'vinay@evolvevcap.com',
        password: 'admin@0001',
        isMasterAdmin: true,
        status: "active",
        roleIds:[adminRole.id!],
        firstName:"Vinay",
        lastName:"",
        entityIds: [],
        isFirstLogin:true
    };


    const existingAdmin = await userService.findUserByEmail(masterAdmin.email);
    if (!existingAdmin) {
        await userService.createUserUsingPassword(masterAdmin);
        console.log('Master admin created successfully.');
    } else {
        console.log('Master admin already exists.');
    }
}

createMasterAdmin();