import React from "react";

interface TableProps {
	data: Record<string, string | number>;
}

const JsonTable: React.FC<TableProps> = ({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Key</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{Object.entries(data).map(([key, value]) => (
					<tr key={key}>
						<td>{key}</td>
						<td>{value}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default JsonTable;
