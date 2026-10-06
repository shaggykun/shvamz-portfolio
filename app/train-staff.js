// Add supplied application assets here; never substitute invented UI.
// Set TRAIN_STAFF_PUBLISHED=true to hide pending sections and asset slots.
export const trainStaffScreens = {
  home: { label: "Home screen", src: null, alt: "Train Staff application home screen showing essential duty information and available actions" },
  duty: { label: "Active-duty screen", src: null, alt: "Train Staff active-duty screen showing the current duty context" },
  report: { label: "Reporting screen", src: null, alt: "Train Staff operational issue reporting screen" },
  reportStart: { label: "Start report", src: null, alt: "Entry point for creating a defect report" },
  reportDetails: { label: "Enter details", src: null, alt: "Defect report details form" },
  reportEvidence: { label: "Attach evidence", src: null, alt: "Evidence attachment step in the defect reporting workflow" },
  reportConfirm: { label: "Confirm submission", src: null, alt: "Defect report submission confirmation" },
  delayList: { label: "Delay list", src: null, alt: "Train Staff delay list with operational status information" },
  progress: { label: "Train progress", src: null, alt: "Train Staff route progress timeline" },
  delayDetail: { label: "Delay detail", src: null, alt: "Train Staff delay detail screen" },
  components: { label: "Interface component board", src: null, alt: "Actual Train Staff interface components including cards, labelled statuses, forms, navigation, and actions" },
};
