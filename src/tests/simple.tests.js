const { pages } = require("./../po");

describe("Doctors page", () => {
  beforeEach(async () => {
    await pages("dashboard").open();
  });

  it("Check page title", async () => {
    await expect(browser).toHaveTitle(
      "Appointment Planner - Syncfusion Angular Components Showcase App"
    );
  });

  it("Open modal window for adding a new doctor", async () => {
    //click on doctors item in the side menu
    await pages("dashboard").sideMenu.item("doctors").click();
    //click on add new doctor button
    await pages("doctors").doctorListHeader.addNewDoctorBtn.click();
    //check that a modal window is displayed
    await expect(pages("doctors").addDoctorModal.rootEl).toBeDisplayed();
  });

  it("Add a new doctor", async () => {
    //click on doctors item in the side menu
    await pages("dashboard").sideMenu.item("doctors").click();
    //click on add new doctor button
    await pages("doctors").doctorListHeader.addNewDoctorBtn.click();
    //check that a modal window is displayed
    await pages("doctors").addDoctorModal.rootEl.waitForDisplayed();
    //fulfill the required fields
    await pages('doctors').addDoctorModal.input('name').setValue("Roberto Palacios Mora");
    await pages('doctors').addDoctorModal.input('phone').setValue(5583457698);
    await pages('doctors').addDoctorModal.input('email').setValue("monchito@gmail.com");
    await pages('doctors').addDoctorModal.input('education').setValue("Basic");
    await pages('doctors').addDoctorModal.input('designation').setValue("helloworld");
    //click on the save button
    await pages('doctors').addDoctorModal.saveBtn.click();
    //modal window should disappear
    await expect(pages('doctors').addDoctorModal.rootEl).not.toBeDisplayed();

    //Verify the doctor
    await expect(pages('doctors').specialistCard(8).name).toHaveText("Dr. Roberto Palacios Mora");
    await expect(pages('doctors').specialistCard(8).education).toHaveText("Basic", { ignoreCase: true })
  });

  it("Close a modal window for adding a new doctor", async () => {
    //click on doctors item in the side menu
    await pages('dashboard').sideMenu.item("doctors").click();
    //click on add new doctor button
    await pages('doctors').doctorListHeader.addNewDoctorBtn.click();
    //check that a modal window is displayed
    await pages('doctors').addDoctorModal.rootEl.waitForDisplayed();
    //click on the close button
    await pages('doctors').addDoctorModal.closeBtn.click();
    //verify that the modal window is not displaying
    await expect(pages("doctors").addDoctorModal.rootEl).not.toBeDisplayed();
  });
});
