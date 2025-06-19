const DashboardPage = require('./../po/pages/dashboard.page');
const DoctorsPage = require('./../po/pages/doctors.page');

const dashboardPage = new DashboardPage();
const doctorsPage = new DoctorsPage();

describe ('Doctors page', () => {
    beforeEach(async () => {
        await dashboardPage.open();
    });

    it('Check page title', async () => {
        await expect (browser).toHaveTitle('Appointment Planner - Syncfusion Angular Components Showcase App');
    })

    it('Open modal window for adding a new doctor', async () => {
        //click on doctors item in the side menu
        await dashboardPage.sideMenu.item('doctors').click();
        //click on add new doctor button
        await doctorsPage.doctorListHeader.addNewDoctorBtn.click();
        //check that a modal window is displayed
        await expect(doctorsPage.addDoctorModal.rootEl).toBeDisplayed();
    })

    it('Add a new doctor', async () => {
        //click on doctors item in the side menu
        await dashboardPage.sideMenu.item('doctors').click();
        //click on add new doctor button
        await doctorsPage.doctorListHeader.addNewDoctorBtn.click();
        //check that a modal window is displayed
        await doctorsPage.addDoctorModal.rootEl.waitForDisplayed();
        //fulfill the required fields
        await $('[name="Name"]').setValue('Roberto Palacios Mora');
        await $('#DoctorMobile').setValue(5583457698);
        await $('[name="Email"]').setValue("monchito@gmail.com");
        await $('[name="Education"]').setValue("Basic");
        await $('[name="Designation"]').setValue("helloworld");
        //click on the save button
        await $('.e-footer-content button.e-primary').click();
        //modal window should disappear
        await expect(doctorsPage.addDoctorModal.rootEl).not.toBeDisplayed();


        //Verify the doctor
        await expect($('#Specialist_8').$('.name').toHaveText('Dr. Roberto Palacios Mora'));
        await expect($('#Specialist_8').$('.education').toHaveText('Basic', {ignoreCase: true}));
    })

    it('Close a modal window for adding a new doctor', async () => {
        //click on doctors item in the side menu
        await dashboardPage.sideMenu.item('doctors').click();
        //click on add new doctor button
        await doctorsPage.doctorListHeader.addNewDoctorBtn.click();
        //check that a modal window is displayed
        await doctorsPage.addDoctorModal.rootEl.waitForDisplayed();
        //click on the close button
        await $('.e-dlg-header-content button.e-control').click();
        //verify that the modal window is not displaying
        await expect(doctorsPage.addDoctorModal.rootEl).not.toBeDisplayed();
    })
}) 