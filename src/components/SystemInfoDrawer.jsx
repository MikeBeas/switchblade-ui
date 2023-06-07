import { useDispatch, useSelector } from 'react-redux';

import { selectShowSystemInfoDrawer, setShowSystemInfoDrawer } from 'state/app';
import { selectServerConfig } from 'state/server';

import { sdk } from 'switchblade-sdk';
import self from '../../package.json';

import Stack from 'components/Stack';
import Drawer from 'components/Drawer';
import Divider from 'components/Divider';
import Button from 'components/Button';

import { switchblade } from 'lib/switchblade';
import { isDev } from 'lib/util';

const SystemInfoDrawer = () => {
  const dispatch = useDispatch();

  const systemConfig = useSelector(selectServerConfig);
  const showSystemInfoDrawer = useSelector(selectShowSystemInfoDrawer);

  const enabledFlags = Object.keys(systemConfig.features ?? {}).filter((key) => systemConfig.features[key]).sort();

  const hasToken = switchblade.hasToken();
  const isExpired = switchblade.isTokenExpired();

  const data = [
    {
      section: 'Server',
      description: 'Information about the Switchblade software running on your server.',
      items: [
        {
          label: 'Switchblade Version',
          value: systemConfig.switchblade.version ?? 'Unknown'
        },
        {
          label: 'API Hostname',
          value: systemConfig.api.host ?? 'Not connected'
        },
        {
          label: 'Authenticated',
          value: systemConfig.api.authenticated ? 'Yes' : 'No'
        },
        {
          label: 'Mode',
          value: systemConfig.api.production ? 'Production' : 'Development'
        },
        {
          label: 'Enabled Feature Flags',
          value: enabledFlags.length > 0 ? (
            <Stack gap={5} style={{ alignItems: 'flex-start', marginTop: 5 }}>
              {enabledFlags.map((i) => <code key={i}>{i}</code>)}
            </Stack>
          ) : 'None'
        }
      ]
    },
    {
      section: 'Switchblade UI',
      description: 'Information about this web interface.',
      items: [
        {
          label: "Switchblade UI Version",
          value: self.version
        },
        {
          label: "Mode",
          value: isDev === "development" ? 'Production' : 'Development'
        },
        {
          label: "Environment Switchblade Hostname",
          value: import.meta.env.SWITCHBLADE_API_HOST ?? 'None'
        }
      ]
    },
    {
      section: 'Switchblade SDK',
      description: 'The Switchblade SDK is a piece of software that enables this web interface to communicate with your Switchblade server.',
      items: [
        {
          label: "Switchblade SDK Version",
          value: sdk.version
        },
        {
          label: "Switchblade SDK Hostname",
          value: switchblade.getHost() ?? 'None'
        },
        {
          label: "Token Status",
          value: hasToken ? (isExpired ? 'Expired' : 'Valid') : 'No token'
        }
      ]
    }
  ]

  return (
    <Drawer
      header="System Info"
      position={Drawer.Positions.Left}
      open={showSystemInfoDrawer}
      showCloseButton={false}
      hide={() => dispatch(setShowSystemInfoDrawer(false))}
      footer={[
        <Button block key="close" size={Button.Sizes.Large} color={Button.Colors.White} onClick={() => dispatch(setShowSystemInfoDrawer(false))}>
          Close
        </Button>
      ]}
    >
      <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }} gap={20}>
        <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {data.map((section, i) => (
            <div key={section.section}>
              <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }} gap={25}>
                <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }} gap={5}>
                  <div style={{ fontWeight: 900, fontSize: 24 }}>{section.section}</div>
                  <div style={{ fontStyle: 'italic' }}>{section.description}</div>
                </Stack>

                <Stack style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {section.items.map((item) => (
                    <div key={item.label}>
                      <span style={{ fontWeight: 700 }}>{item.label}:</span> {item.value}
                    </div>
                  ))}
                </Stack>
              </Stack>
              {i !== data.length - 1 && <Divider />}
            </div>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default SystemInfoDrawer;