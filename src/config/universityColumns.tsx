import { Link, List, ListItem, ListItemText } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const universitycolumns: GridColDef[] = [
	// { field: "alpha_two_code", headerName: "Country Code", flex: 1 },
	// { field: "country", headerName: "Country", flex: 2 },
	{ field: "name", headerName: "University Name", align: "left", flex: 3 },
	{
	  field: "state-province",
	  headerName: "State\nProvince",
	  flex: 1,
	  filterable: false,
	},
	{
	  field: "domains",
	  headerName: "Domains",
	  filterable: false,
	  flex: 2,
	  renderCell: (params) => {
		return (
		  <List dense>
			{params.row.domains.map((domain: string) => (
			  <ListItem key={domain} >
			    <Link href={domain} target="_blank">
				  {domain}
				</Link>
			  </ListItem>
			))}
		  </List>
		);
	  },
	},
	{
	  field: "web_pages",
	  headerName: "Web Pages",
	  flex: 2,
	  filterable: false,
	  renderCell: (params) => {
		return (
		  <List dense={true}>
			{params.row.web_pages.map((site: string) => (
			  <ListItemText key={site}>
				<Link href={site} target="_blank">
				  {site}
				</Link>
			  </ListItemText>
			))}
		  </List>
		);
	  },
	},
  ];