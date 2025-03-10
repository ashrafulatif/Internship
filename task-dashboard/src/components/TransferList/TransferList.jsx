"use client";
import { useState } from "react";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import CardHeader from "@mui/material/CardHeader";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Iconify from "../Iconify/Iconify";
import TextField from "@mui/material/TextField";

// Initial permissions JSON data
const initialPermissions = {
  mis_add: false,
  mis_change: false,
  mis_delete: false,
  mis_view: false,
  happy_home_add: false,
  happy_home_change: false,
  happy_home_delete: false,
  happy_home_view: false,
  qb_add: false,
  qb_change: false,
  qb_delete: false,
  qb_view: false,
  frm_add: false,
  frm_change: false,
  frm_delete: false,
  frm_view: false,
  project_on_track_add: false,
  project_on_track_change: false,
  project_on_track_delete: false,
  project_on_track_view: false,
  study_research_add: false,
  study_research_change: false,
  study_research_delete: false,
  study_research_view: false,
  learning_add: false,
  learning_change: false,
  learning_delete: false,
  learning_view: false,
};

// Utility functions
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// TransferList component
export default function TransferList() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(Object.keys(initialPermissions));
  const [right, setRight] = useState([]);
  const [filter, setFilter] = useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    updatePermissions(right.concat(leftChecked), true);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    updatePermissions(rightChecked, false);
  };

  //update the prermissions
  const updatePermissions = (items, value) => {
    items.forEach((item) => {
      initialPermissions[item] = value;
    });
    console.log(
      "Updated Permissions:",
      Object.keys(initialPermissions).filter((key) => initialPermissions[key])
    );
  };

  //set filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  //filter check
  const filteredLeft = left.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  const customList = (title, items) => (
    <Card sx={{ borderRadius: 1.5 }}>
      <CardHeader
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "All items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
        sx={{ p: 2 }}
      />
      <Divider />
      <List
        dense
        component="div"
        role="list"
        sx={{ width: 300, height: 350, overflow: "auto" }}
      >
        {items.map((value) => (
          <ListItemButton
            key={value}
            role="listitem"
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                disableRipple
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                inputProps={{
                  "aria-labelledby": `transfer-list-all-item-${value}-label`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`transfer-list-all-item-${value}-label`}
              primary={formatPermission(value)}
            />
          </ListItemButton>
        ))}
      </List>
    </Card>
  );

  const formatPermission = (permission) => {
    const [category, action] = permission.split("_");
    const formattedCategory = category.replace(/_/g, " ");
    return `Register | ${formattedCategory} | Can ${action} ${formattedCategory}`;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ p: 3 }}>
      <Grid item>
        <TextField
          label="Filter"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          sx={{ mb: 2 }}
        />
        {customList("Available Permissions", filteredLeft)}
      </Grid>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
          sx={{ my: 1 }}
        >
          <Iconify icon="eva:arrow-ios-forward-fill" width={18} />
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
          sx={{ my: 1 }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={18} />
        </Button>
      </Grid>
      <Grid item>{customList("Chosen Permissions", right)}</Grid>
    </Grid>
  );
}
