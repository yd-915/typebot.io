import { Stack } from '@chakra-ui/react'
import { DropdownList } from '@/components/DropdownList'
import { Cell } from 'models'
import { TableListItemProps } from '@/components/TableList'
import { Input } from '@/components/inputs'

export const CellWithValueStack = ({
  item,
  onItemChange,
  columns,
}: TableListItemProps<Cell> & { columns: string[] }) => {
  const handleColumnSelect = (column: string) => {
    if (item.column === column) return
    onItemChange({ ...item, column })
  }
  const handleValueChange = (value: string) => {
    if (item.value === value) return
    onItemChange({ ...item, value })
  }
  return (
    <Stack p="4" rounded="md" flex="1" borderWidth="1px" w="full">
      <DropdownList<string>
        currentItem={item.column}
        onItemSelect={handleColumnSelect}
        items={columns}
        placeholder="Select a column"
      />
      <Input
        defaultValue={item.value ?? ''}
        onChange={handleValueChange}
        placeholder="Type a value..."
      />
    </Stack>
  )
}
