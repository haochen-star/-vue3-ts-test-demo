<template>
  <div>
    <el-table :data="sortData(tableData)" border :span-method="arraySpanMethod">
      <el-table-column prop="name" label="Name" sortable></el-table-column>
      <el-table-column prop="age" label="Age" sortable></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import _ from 'lodash'
import { ElTable, ElTableColumn } from 'element-plus'

export default defineComponent({
  name: 'MyTable',
  data() {
    return {
      tableData: [
        {
          name: 'John',
          age: 18,
          address: 'No. 1, West Road',
        },
        {
          name: 'James',
          age: 18,
          address: 'No. 4, North Road',
        },
        {
          name: 'Tom',
          age: 21,
          address: 'No. 2, East Road',
        },
        {
          name: 'Mary',
          age: 21,
          address: 'No. 3, South Road',
        },
        {
          name: 'Carl',
          age: 18,
          address: 'No. 3, South Road',
        },
        {
          name: 'Mary',
          age: 21,
          address: 'No. 3, South Road',
        },
        {
          name: 'Mary',
          age: 21,
          address: 'No. 3, South Road',
        },
        {
          name: 'Mary',
          age: 21,
          address: 'No. 3, South Road',
        },
      ],
    }
  },
  computed: {},
  methods: {
    sortData(tableData: any[]) {
      const arr = _.cloneDeep(tableData)
      return arr
        .sort((a, b) => a.age - b.age)
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }: any) {
      const sortedData = this.sortData(this.tableData)
      if (columnIndex === 0 || columnIndex === 1) {
        if (
          rowIndex > 0 &&
          sortedData[rowIndex - 1][column.property] === row[column.property]
        ) {
          return {
            rowspan: 0,
            colspan: 0,
          }
        } else {
          let rowspan = 1
          let i = rowIndex + 1
          while (
            i < sortedData.length &&
            sortedData[i][column.property] === row[column.property]
          ) {
            rowspan++
            i++
          }

          return {
            rowspan,
            colspan: 1,
          }
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1,
        }
      }
    },
  },
})
</script>
