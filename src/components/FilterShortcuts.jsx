import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetShortcutFilters, selectShortcutsCreator, selectShortcutFilters, selectShortcutsLoading, selectShortcutsSearchTerm, setShortcutsSearchTerm, updateShortcutFilters, updateShortcutsCreator } from 'state/shortcuts';

import { SHORTCUT_STATES } from 'constants/shortcutStates';
import { DELETED_STATES } from 'constants/deletedStates';

import Stack from 'components/Stack';
import Select from 'components/Select';
import LabeledInput from 'components/LabeledInput';
import Collapse from 'components/Collapse';
import Button from 'components/Button';
import MobileSwap from 'components/MobileSwap';
import Input from 'components/Input';
import FeatureFlag from 'components/FeatureFlag';

import { switchblade } from 'lib/switchblade';
import { isMobile } from 'lib/config';
import { useDebounce } from 'lib/util';
import AutoComplete from 'components/AutoComplete';

const FilterShortcuts = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectShortcutsLoading);
  const filters = useSelector(selectShortcutFilters);
  const creator = useSelector(selectShortcutsCreator);

  const search = useSelector(selectShortcutsSearchTerm);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(updateShortcutFilters({ search: debouncedSearch }))
  }, [debouncedSearch]);

  const onSearchCreator = async (searchTerm) => {
    if (!searchTerm) {
      dispatch(updateShortcutsCreator({ options: [] }));
      return;
    }

    dispatch(updateShortcutsCreator({ loading: true }));

    const { users } = await switchblade.autocomplete.users(searchTerm);
    const newOpts = users.map((u) => ({ label: u.username, value: u.id }));
    dispatch(updateShortcutsCreator({ loading: false, options: newOpts }));
  }

  const onSelectCreator = (selectedCreator) => {
    dispatch(updateShortcutFilters({ creatorId: selectedCreator?.value ?? null }))
    dispatch(updateShortcutsCreator({ selected: selectedCreator }));
  }

  const render = () => (
    <Stack block horizontal style={{ justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'end', flexWrap: 'wrap', rowGap: 15 }}>
      <FeatureFlag flag="CREATOR_ID_FILTER">
        <LabeledInput label="Shortcut Creator">
          <AutoComplete
            placeholder="Find Users"
            disabled={loading}
            loading={creator.loading}
            block={isMobile}
            value={creator.selected}
            onSearch={onSearchCreator}
            onChange={(newCreatorId) => onSelectCreator(newCreatorId)}
            options={creator.options}
          />
        </LabeledInput>
      </FeatureFlag>

      <FeatureFlag flag="SHORTCUT_KEYWORD_SEARCH">
        <LabeledInput label="Search">
          <Input
            placeholder="Search Term"
            disabled={loading}
            block={isMobile}
            value={search}
            onChange={(search) => dispatch(setShortcutsSearchTerm(search))}
          />
        </LabeledInput>
      </FeatureFlag>

      <LabeledInput label="Status">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.state}
          onChange={(state) => dispatch(updateShortcutFilters({ state }))}
          options={SHORTCUT_STATES}
        />
      </LabeledInput>

      <LabeledInput label="Deleted Items">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.deleted}
          placeholder="Deleted"
          onChange={(deleted) => dispatch(updateShortcutFilters({ deleted }))}
          options={DELETED_STATES}
        />
      </LabeledInput>

      <LabeledInput>
        <Button
          block
          onClick={() => dispatch(resetShortcutFilters())}
          color={Button.Colors.White}
          disabled={loading}
        >
          Reset Filters
        </Button>
      </LabeledInput>
    </Stack>
  )

  return (
    <MobileSwap
      desktop={render}
      mobile={() => <Collapse title="Filters">{render()}</Collapse>}
    />
  )
}

export default FilterShortcuts;