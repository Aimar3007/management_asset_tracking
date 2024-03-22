import { useFormik } from 'formik'

const useTabMaster = ({
    handleSearch,
}: {
    // eslint-disable-next-line no-unused-vars
    handleSearch?: (values: string) => void
}) => {
    const formik = useFormik<{ searchTerm: string }>({
        initialValues: { searchTerm: '' },
        onSubmit: (values) => handleSearch && handleSearch(values.searchTerm),
        validate: (values) => {
            const errors: any = {}
            if (
                values.searchTerm.length < 3 &&
                values.searchTerm.length !== 0
            ) {
                errors.searchTerm = 'Search term must be at least 3 characters'
            }
            return errors
        },
    })

    return {
        formik,
    }
}

export default useTabMaster
