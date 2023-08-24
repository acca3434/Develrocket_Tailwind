const DefaultTable: React.FC = () => {
    return (
        <table className="w-full">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Role</th>
                </tr>
            </thead>
            <tbody>
                <tr className="hover:bg-gray-100">
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">John Doe</td>
                    <td className="border px-4 py-2">28</td>
                    <td className="border px-4 py-2">User</td>
                </tr>
                <tr className="hover:bg-gray-100">
                    <td className="border px-4 py-2">2</td>
                    <td className="border px-4 py-2">Jane Smith</td>
                    <td className="border px-4 py-2">32</td>
                    <td className="border px-4 py-2">Admin</td>
                </tr>
            </tbody>
        </table>
    )
}

export default DefaultTable
