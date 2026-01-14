import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const PDFTemplate = ({ formData }: { formData: any }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>
            {formData.first_name} {formData.last_name}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>
            {formData.selected_unit} {formData.selected_address}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate;
